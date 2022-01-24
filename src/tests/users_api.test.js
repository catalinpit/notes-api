const bcrypt = require('bcrypt');
const User = require('../models/User');

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('secret', 10);
        const user = new User({ username: 'root', passwordHash });

        await user.save();
    });

    test('successful user creation', async () => {
        const initialUsers = await helper.usersInDb();

        const newUser = {
            username: 'catalinmpit',
            name: 'Catalin Pit',
            password: 'aNotSoSecretPassword'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const finalUsers = await helper.usersInDb();
        const usernames = finalUsers.map(u => u.username);

        expect(finalUsers).toHaveLength(initialUsers.length + 1);
        expect(usernames).toContain(newUser.username);
    });

    test('user creation fails if username exists', async () => {
        const initialUsers = await helper.usersInDb();

        const newUser = {
            username: 'catalinmpit',
            name: 'Catalin Pit',
            password: 'aNotSoSecretPassword'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        const finalUsers = await helper.usersInDb();
        
        expect(result.body.error).toContain('`username` to be unique');
        expect(finalUsers).toHaveLength(initialUsers.length);
    });
});