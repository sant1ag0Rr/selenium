Feature: Available y variants guards

  Scenario: /availableVehicles redirige a signin sin sesión
    When I open the "/availableVehicles" page
    Then I should be on the "/signin" page

  Scenario: /allVariants redirige a signin sin sesión
    When I open the "/allVariants" page
    Then I should be on the "/signin" page
