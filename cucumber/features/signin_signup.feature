Feature: Form validaciones básicas

  Scenario: SignIn muestra inputs
    When I open the "/signin" page
    Then I should see text "Iniciar Sesión"

  Scenario: SignUp muestra inputs
    When I open the "/signup" page
    Then I should see text "Registrarse"
