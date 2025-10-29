Feature: Vendor y Admin guards

  Scenario: Vendor dashboard redirige a vendorSignin sin sesión
    When I open the "/vendorDashboard" page
    Then I should be on the "/vendorSignin" page

  Scenario: Admin dashboard redirige a signin sin sesión
    When I open the "/adminDashboard" page
    Then I should be on the "/signin" page
