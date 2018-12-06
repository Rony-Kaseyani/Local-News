import { Selector } from 'testcafe'

fixture`Login`.page`http://localhost:3000`

test('Login test', async t => {
  await t
    .click(':containsExcludeChildren(Login)')
    .type("[name='email']", 'admin@email.com')
    .press('tab')
    .type("[name='password']", 'admin')
    .click(".submit[name='name']")
})
