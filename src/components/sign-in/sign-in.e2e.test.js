import React from 'react';
import SignIn from './sign-in.jsx';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter(),
});

const user =
{
  'login': ``,
  'password': ``,
};

it(`submit form with user data`, () => {
  const onSubmit = jest.fn();
  const container = Enzyme.mount(
      <SignIn
        onSubmit = {onSubmit}
      />
  );

  const formLogin = container.find(`.login__form`);
  formLogin.simulate(`submit`);
  expect(onSubmit).toBeCalledTimes(1);
  expect(onSubmit).toBeCalledWith(user);
});
