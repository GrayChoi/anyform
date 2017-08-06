const dbSchema = {
  users: {
    UID: {
      forms: {
        ID: {
          key: 'firebaseKey',
          createdAt: '1234567',
          updatedAt: '1234567',
          name: 'form',
        }
      },
      formItems: {
        FORM_ID: {
          ID: {
            key: 'firebaseKey',
            createdAt: '1234567',
            updatedAt: '1234567',
            type: 'input',
            label: 'インプット'
          }
        }
      }
    }
  }
};