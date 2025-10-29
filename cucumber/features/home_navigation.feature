Feature: Home navegación
  As a visitor
  I want to navigate from Home to other pages
  So that I can discover vehicles y empresa

  Scenario: Ir de Home a Vehicles
    Given I open the Home page
    When I click the "Ver Vehículos Disponibles" button
    Then I should be on the "/vehicles" page

  Scenario: Ir de Home a Enterprise
    Given I open the Home page
    When I click the "Información Empresarial" button
    Then I should be on the "/enterprise" page
