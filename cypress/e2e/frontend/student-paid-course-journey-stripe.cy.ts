describe("Tutor Student Paid Course Journey", () => {
  beforeEach(() => {
    cy.visit(
      `${Cypress.env("base_url")}/courses/${Cypress.env("paid_course_slug")}/`
    );
  });

  it("should be able to enroll in a paid course, view cart, and manage items", () => {
    cy.intercept(
      "POST",
      `${Cypress.env("base_url")}/wp-admin/admin-ajax.php`
    ).as("ajaxRequest");

    cy.isEnrolled().then((isEnrolled) => {
      if (!isEnrolled) {
        cy.get("button[name='add-to-cart']")
          .contains("Add to cart")
          .click();
        // Login as a student
        cy.getByInputName("log").type(Cypress.env("student_username"));
        cy.getByInputName("pwd").type(Cypress.env("student_password"));
        cy.get("#tutor-login-form button")
          .contains("Sign In")
          .click();
        cy.url().should("include", Cypress.env("paid_course_slug"));

        cy.get("body").then(($body) => {
          if ($body.find("button[name='add-to-cart']").length > 0) {
            cy.get("button[name='add-to-cart']")
              .contains("Add to cart")
              .click();
          } else if ($body.find(".tutor-woocommerce-view-cart").length > 0) {
            cy.get(".tutor-woocommerce-view-cart")
              .contains("View Cart")
              .click();

          }
        });

        cy.url().then((url) => {
          if (url.includes("/cart")) {
            cy.get(".wc-block-cart__submit-button")
              .contains("Proceed to Checkout")
              .click();
            cy.url().should("include", "/checkout");

            cy.get("#billing-first_name")
              .clear()
              .type("Student");
            cy.get("#billing-last_name")
              .clear()
              .type("Test");
            cy.get("#billing-address_1")
              .clear()
              .type("123 Main Street");

            cy.get("#billing-city")
              .clear()
              .type("New York");

            cy.get("#components-form-token-input-1")
              .clear()
              .type("Florida");

            cy.get("#billing-postcode")
              .clear()
              .type("96799");
            cy.get("#billing-phone")
              .clear()
              .type("+8801555123456");

              cy.get(
                ":nth-child(4) > .wc-block-components-radio-control__option"
              ).click();

            cy.get("body").then(($body) => {
              if ($body.find(".tutor-icon-times").length > 0) {
                cy.get(".tutor-icon-times").click();
              }
            });

            // if previous cards are added

            // cy.get("ul.woocommerce-SavedPaymentMethods").then(($ul) => {
            //   // Check if there are more than one li items
            //   if ($ul.children("li").length > 0) {
            //     // Click the "Use a new payment method" option
            //     cy.get("#wc-stripe-payment-token-new")
            //       .check()
            //       .should("be.checked");
            //   }
            // });
            
            // card number
            cy.frameLoaded(
              "#wc-stripe-card-number-element > .__PrivateStripeElement > iframe"
            );

            cy.iframe(
              "#wc-stripe-card-number-element > .__PrivateStripeElement > iframe"
            ).within(() => {
              cy.get('input[name="cardnumber"]').type("4242424242424242");
            });

            cy.frameLoaded(
              "#wc-stripe-card-expiry-element > .__PrivateStripeElement > iframe"
            );

            cy.iframe(
              "#wc-stripe-card-expiry-element > .__PrivateStripeElement > iframe"
            ).within(() => {
              cy.get('input[name="exp-date"]').type("12/25");
            });

            // cvv
            cy.frameLoaded(
              "#wc-stripe-card-code-element > .__PrivateStripeElement > iframe"
            );

            cy.iframe(
              "#wc-stripe-card-code-element > .__PrivateStripeElement > iframe"
            ).within(() => {
              cy.get('input[name="cvc"]').type("123");
            });

            cy.get("button")
              .contains("Place Order")
              .click();

            cy.wait("@ajaxRequest", { timeout: 15000 }).then((interception) => {
              expect(interception.response.body.success).to.equal(true);
            });

            cy.url().should("include", "/enrolled-courses");

            cy.get(".tutor-course-name")
              .eq(0)
              .click();
          }
        });
      }
    });

    cy.handleCourseStart();

    cy.url().should("include", Cypress.env("paid_course_slug"));

    cy.isEnrolled().then((isEnrolled) => {
      if (isEnrolled) {
        cy.get(".tutor-course-topic-item").each(($topic, index, $list) => {
          const isLastItem = index === $list.length - 1;

          cy.url().then(($url) => {
            if ($url.includes("/lesson")) {
              cy.completeLesson();
              cy.handleNextButton();
            }

            if ($url.includes("/assignments")) {
              cy.handleAssignment(isLastItem);
            }

            if ($url.includes("/quizzes")) {
              cy.handleQuiz();
            }

            if ($url.includes("/meet-lessons")) {
              cy.handleMeetingLesson(isLastItem);
            }

            if ($url.includes("/zoom-lessons")) {
              cy.handleZoomLesson(isLastItem);
            }
          });
        });
      }
    });

    cy.completeCourse();
    cy.submitCourseReview();
    cy.viewCertificate();
  });
});
