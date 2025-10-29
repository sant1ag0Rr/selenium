Feature: 404 page

  Scenario: Ruta inexistente muestra 404
    When I open the "/ruta-que-no-existe-123" page
    Then I should see text "Uh-oh!"
