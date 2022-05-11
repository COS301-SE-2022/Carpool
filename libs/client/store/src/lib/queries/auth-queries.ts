export const USER_LOGIN = `
  query ($email: String!, $password: String!) {
     login(email: $email, password: $password) {
        id
        token
     }
  }
`;

export const USER_REGISTER = `
  mutation ($name: String!, $surname: String!, $email: String!, $university: String!, $studentNumber: String!, $password: String!) {
      register(name: $name, surname: $surname, email: $email, university: $university, studentNumber: $studentNumber, password: $password) {
        id
        email
        verificationCode
        expires
      }
  }
`;

export const VERIFY_EMAIL = `
  mutation ($id: String!) {
      verifyEmail(id: $id) {
        id
        token
      }
  }
`;
