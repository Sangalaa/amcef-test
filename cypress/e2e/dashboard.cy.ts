/// <reference types="cypress" />

export interface TodoList {
    id: string;
    title: string;
    createdAt: string;
}

describe("Dashboard", () => {
    beforeEach(() => {
        cy.visit("/")
    })

    it("should redirect to / after clicking on logo", () => {
        cy.findByTestId('logo').click()
        cy.location('pathname').should('eq', '/')
    })

    it("should display todo lists", () => {
        cy.intercept("GET", `${Cypress.env("API_URL")}/lists**`, {
            fixture: "dashboard.json",
        }).as("todoLists");

        cy.wait("@todoLists").then((xhr) => {
            const todoLists = xhr.response?.body as TodoList[]

            cy.findAllByTestId('todoList').each(($todoListPreview, index) => {
                const todoList: TodoList = todoLists[index]

                cy.wrap($todoListPreview).as("todoListPreview")

                cy.get("@todoListPreview").findByRole("button").should('have.text', todoList.title)
            })
        })
    });

    it("should display validation error if todo list name is empty", () => {
        cy.get("form").findByRole('button', { name: /pridaj/i }).click()
        cy.contains("Názov je vyžadovaný").should('be.visible')
    })

    it("should add a new todo list", () => {
        const mockTodoList: TodoList = {
            id: "-999",
            title: "Nový zoznam",
            createdAt: "2022-08-23T00:08:39.827Z",
        };

        cy.intercept("POST", '**/lists*', (req) => {
            req.reply((res) => {
                res.send(mockTodoList);
            })
        }).as("newTodoList")

        cy.get("form").findByTestId("addTodoForm-input-title").type(mockTodoList.title)
        cy.get("form").findByRole("button").click();
        cy.wait("@newTodoList").then(() => {
            cy.get("#notistack-snackbar").findByText(`Todo list ${mockTodoList.title} bol úspešne pridaný`).should('exist')

            cy.findAllByTestId("todoList")
            .eq(0)
            .findByRole("button")
            .should("have.text", mockTodoList.title);
        })
    })
});
