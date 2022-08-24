/// <reference types="cypress" />

import moment from "moment";

export interface TodoItem {
    id: string;
    listId: string;
    title: string;
    description: string;
    done: boolean;
    deadline: string;
    createdAt: string;
    updatedAt: string;
}

describe("TodoList", () => {
    beforeEach(() => {
        cy.visit("/list/1");

        cy.intercept("GET", "**/lists/1/items**", {
            fixture: "todoItems.json",
        }).as("todoItems");
    });

    it("should redirect to / after clicking on logo", () => {
        cy.findByTestId("logo").click();
        cy.location("pathname").should("eq", "/");
    });

    it("should display todo items", () => {
        cy.wait("@todoItems").then((xhr) => {
            const todoItems = xhr.response?.body as TodoItem[];

            let previousDateMilliseconds = 0;

            cy.findAllByTestId("todoItem").each(($todoItemPreview, index) => {
                const todoItem: TodoItem = todoItems[index];

                // test if deadlines are ascending
                if (index === 0) previousDateMilliseconds = 0;

                const currentDateMilliseconds = new Date(
                    todoItem.deadline
                ).getMilliseconds();

                expect(previousDateMilliseconds <= currentDateMilliseconds).to
                    .be.true;

                previousDateMilliseconds = currentDateMilliseconds;

                // test todoItem content
                cy.wrap($todoItemPreview).as("todoItemPreview");

                cy.get("@todoItemPreview")
                    .findByText(todoItem.title)
                    .should("exist");
                cy.get("@todoItemPreview")
                    .findByText(todoItem.description)
                    .should("exist");
                cy.get("@todoItemPreview")
                    .findByText(new Date(todoItem.deadline).toLocaleString())
                    .should("exist");
            });
        });
    });

    it("should mark todo item as completed", () => {
        cy.intercept(
            {
                method: "PUT",
                url: "**/lists/1/items/**",
            },
            (req) => {
                req.reply({ done: true });
            }
        ).as("updateTodoItem");

        cy.wait("@todoItems").then(() => {
            cy.findAllByTestId("todoItem")
                .eq(0)
                .within(() => {
                    cy.findByTestId("DoneIcon").click();
                    cy.wait("@updateTodoItem").then(() => {
                        cy.findByTestId("DoneIcon").should("not.exist");
                        cy.findByTestId("ReplayIcon").should("exist");
                    });
                });
            cy.get("#notistack-snackbar", { timeout: 2000 })
                .findByText("Status bol aktualizovaný")
                .should("exist");
        });
    });

    it("should delete todo item", () => {
        cy.intercept("DELETE", "**/lists/*/items/**", (req) => {
            req.reply({});
        }).as("deleteTodoItem");

        cy.wait("@todoItems").then((xhr) => {
            const todoItems = xhr.response?.body as TodoItem[];
            const todoItemToDelete = todoItems[0];

            cy.findAllByTestId("todoItem")
                .eq(0)
                .within(() => {
                    cy.findByTestId("DeleteIcon").click();
                });

            cy.wait("@deleteTodoItem").then(() => {
                cy.findAllByTestId("todoItem").each(
                    ($todoItemPreview, index) => {
                        cy.wrap($todoItemPreview).as("todoItemPreview");

                        cy.get("@todoItemPreview")
                            .findByText(todoItemToDelete.title)
                            .should("not.exist");
                        cy.get("@todoItemPreview")
                            .findByText(todoItemToDelete.description)
                            .should("not.exist");
                    }
                );

                cy.get("#notistack-snackbar", { timeout: 2000 })
                    .findByText("Todo item bol úspešne vymazaný")
                    .should("exist");
            });
        });
    });

    it("should display validation errors when try to submit empty text fields", () => {
        cy.findByTestId("addTodoListItemForm").within(() => {
            cy.findByRole("button", { name: /pridaj/i }).click();
        });
        cy.findByText("Názov je povinný").should("be.visible");
        cy.findByText("Popis úlohy je povinný").should("be.visible");
        cy.findByText("Termín splnenia má nesprávny formát").should(
            "be.visible"
        );
    });

    it("should add a new todo item", () => {
        cy.intercept("POST", "**/lists/1/items**", (req) => {
            req.reply({
                id: "-5",
                listId: "1",
                title: "Nová úloha",
                description: "Pipis novej úlohy",
                createdAt: moment().toISOString(),
                updatedAt: moment().toISOString(),
                deadline: moment().toISOString(),
                done: false,
            });
        }).as("addTodoItem");

        cy.findByTestId("addTodoListItemForm-input-title").type("Nová úloha");
        cy.findByTestId("addTodoListItemForm-input-description").type(
            "Popis novej úlohy"
        );

        cy.findByTestId("addTodoListItemForm-input-deadline").within(() => {
            cy.findByRole("button").click();
        });

        cy.findByRole("dialog").within(() => {
            cy.findByTestId("ArrowRightIcon").click();
            cy.findByRole("grid").within(() => {
                cy.findAllByRole("button").eq(0).click();
            });
        });

        cy.findByTestId("addTodoListItemForm").within(() => {
            cy.findByRole("button", { name: /pridaj/i }).click();
        });

        cy.wait("@addTodoItem").then(() => {
            cy.get("#notistack-snackbar", { timeout: 2000 })
                .findByText(`Todo item Nová úloha bol úspešne pridaný`)
                .should("exist");
        });
    });

    it("should filter todo items based on search input", () => {
        cy.wait("@todoItems").then((xhr) => {
            const todoItems = xhr.response?.body as TodoItem[];
            const firstTodoItem = todoItems[0];

            cy.intercept("GET", "**/lists/1/items**?title=**", (req) => {
                const search = req.query?.title;

                req.reply(
                    todoItems.filter((item) =>
                        item.title.includes(search as string)
                    )
                );
            }).as("search");

            cy.findByTestId("search-input").type(
                firstTodoItem.title.slice(0, 3)
            );
        });

        cy.wait("@search").then((xhr) => {
            const filteredTodoItems = xhr.response?.body as TodoItem[];

            cy.findAllByTestId("todoItem").each(($todoItemPreview, index) => {
                const filteredTodoItem = filteredTodoItems[index];

                cy.wrap($todoItemPreview).as("todoItemPreview");

                cy.get("@todoItemPreview")
                    .findByText(filteredTodoItem.title)
                    .should("exist");
                cy.get("@todoItemPreview")
                    .findByText(filteredTodoItem.description)
                    .should("exist");
            });
        });
    });

    it("should daco", () => {
        cy.wait("@todoItems").then((xhr) => {
            const todoItems = xhr.response?.body as TodoItem[];

            cy.intercept("GET", "**/lists/1/items**?done=**", (req) => {
                const done = req.query?.done === "true";

                req.reply(todoItems.filter((item) => item.done === done));
            }).as("search");

            cy.findByTestId("todoItemSearch-chip-undone").click();

            cy.wait("@search").then((xhr) => {
                const filteredTodoItems = xhr.response?.body as TodoItem[];

                cy.findAllByTestId("todoItem").each(
                    ($todoItemPreview, index) => {
                        const filteredTodoItem = filteredTodoItems[index];

                        cy.wrap($todoItemPreview).as("todoItemPreview");

                        cy.get("@todoItemPreview")
                            .findByText(filteredTodoItem.title)
                            .should("exist");
                        cy.get("@todoItemPreview")
                            .findByText(filteredTodoItem.description)
                            .should("exist");
                        cy.get("@todoItemPreview").findByTestId("DoneIcon").should('exist')
                    }
                );

                cy.findByTestId("todoItemSearch-chip-done").click();
            });

            cy.wait("@search").then((xhr) => {
                const filteredTodoItems = xhr.response?.body as TodoItem[];

                cy.findAllByTestId("todoItem").each(
                    ($todoItemPreview, index) => {
                        const filteredTodoItem = filteredTodoItems[index];

                        cy.wrap($todoItemPreview).as("todoItemPreview");

                        cy.get("@todoItemPreview")
                            .findByText(filteredTodoItem.title)
                            .should("exist");
                        cy.get("@todoItemPreview")
                            .findByText(filteredTodoItem.description)
                            .should("exist");
                        cy.get("@todoItemPreview").findByTestId("ReplayIcon").should('exist')
                    }
                );
            });
        });
    });
});
