Feature: Vehicles flows

  Scenario: Home a Vehicles y abrir detalles
    Given I open the Home page
    When I click the "Ver Vehículos Disponibles" button
    Then I should be on the "/vehicles" page

  Scenario: /vehicles requiere sesión para checkout
    When I open the "/checkoutPage" page
    Then I should be on the "/signin" page
