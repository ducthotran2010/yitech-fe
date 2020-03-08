import { Layout } from 'antd';
import Head from 'next/head';
import { ComplexRegistration } from '../component/user/complex-registration/complex-registration';

export default () => {
  return (
    <Layout className="min-h-screen">
      <Head>
        <title>Yitech | The fast & visual way to understand your users!</title>
      </Head>
      <h1 className="my-16 text-3xl text-center font-bold text-purple-500">
        The fast & visual way to understand your users!
      </h1>
      <ComplexRegistration />
    </Layout>
  );
};
