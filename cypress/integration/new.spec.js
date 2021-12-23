describe('Open test.md in viewer', function() {

	beforeEach(function() {
		cy.login()
	})

	afterEach(function() {
		cy.logout()
	})

	/*it('Opens settings', function() {
		cy.logout()
		cy.loginAsUser('admin', 'admin', '/index.php/settings/admin/richdocuments')
		cy.get('#security-warning-state-ok .message')
			.should('be.visible')
			.should('contain.text', 'Collabora Online server is reachable.')
		cy.screenshot()
		cy.logout()
	})*/

	const newFileTypeLabels = [
		'document', 'spreadsheet', 'presentation', 'graphic',
	]
	newFileTypeLabels.forEach((filetype) => {

		it('Create empty ' + filetype + ' file', function() {
			cy.visit('/apps/files')
			cy.get('#controls .button.new')
				.should('be.visible')
				.click()

			cy.get('.newFileMenu', { timeout: 10000 })
				.should('be.visible')
				.contains('.menuitem', 'New ' + filetype)
				.as('menuitem')
				.should('be.visible')
				.click()

			cy.get('@menuitem').find('.filenameform input[type=text]').type('MyNewFile')
			cy.get('@menuitem').find('.filenameform .icon-confirm').click()

			cy.get('#viewer', { timeout: 15000 })
				.should('be.visible')
				.and('have.class', 'modal-mask')
				.and('not.have.class', 'icon-loading')

			cy.get('#collaboraframe').iframe().should('exist').as('collaboraframe')
			cy.get('@collaboraframe').within(() => {
				cy.get('#loleafletframe').iframe().should('exist').as('loleafletframe')
			})

			cy.get('@loleafletframe').find('#main-document-content').should('exist')

			cy.screenshot('new-file-' + filetype)

			cy.get('@loleafletframe').within(() => {
				cy.get('#closebutton').click()
			})
			cy.get('#viewer', { timeout: 5000 }).should('not.exist')
		})
	})
})
