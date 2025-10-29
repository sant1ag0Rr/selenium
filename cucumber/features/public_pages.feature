Feature: Páginas públicas
  Visitors can see public pages

  Scenario: Enterprise contiene el título
    When I open the "/enterprise" page
    Then I should see text "Lista tu vehículo"

  Scenario: Contact contiene "Contacto"
    When I open the "/contact" page
    Then I should see text "Contacto"
