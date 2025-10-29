Feature: Guards de rutas
  As a user
  I want protected routes to redirect when not authenticated
  So that sensitive pages are not accessible

  Scenario: Checkout redirige a /signin sin sesión
    When I open the "/checkoutPage" page
    Then I should be on the "/signin" page

  Scenario: Profile redirige a /signin sin sesión
    When I open the "/profile" page
    Then I should be on the "/signin" page
