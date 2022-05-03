export const USER_LOGIN = `
  query ($email: String!, $password: String!) {
     login(email: $email, password: $password) {
        id
        name
        surname
        email
        university
        studentNumber
     }
  }
`;
