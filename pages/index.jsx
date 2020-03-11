import { ComplexRegistration } from '../component/user/complex-registration/complex-registration';

export default () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="py-16 text-3xl text-center font-bold text-purple-500">
        The fast & visual way to understand your users!
      </h1>
      <ComplexRegistration />
    </div>
  );
};
