const Page = () => {
  return (
    <>
      <div>
        <div
          className="flex items-stretch bg-local bg-cover h-screen p-64"
          style={{
            backgroundImage: 'url(/background-banner3.jpg)',
          }}
        >
          <div className="flex flex-col justify-center">
            <p className="font-sans text-6xl font-bold text-white">
              Yitech <br />User Tracking
            </p>
            <p className="font-sans text-xl text-black">
              The fast & visual way to understand your user!
            </p>
            <a
              className="flex items-center justify-center w-64 h-12 rounded-lg mt-10"
              href="http://yitech.herokuapp.com/"
              style={{ backgroundColor: 'rgb(42, 15, 64)', color: 'white' }}
            >
              Let's Get Started
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center p-20">
        <div >
          <img src="/heatmap-image.png" alt="" style={{ width: '600px' }} />
        </div>
        <div
          className="flex flex-col justify-center"
          style={{ width: '600px', padding: '100px' }}
        >
          <p className="font-sans text-3xl font-bold pb-5">
            Heatmap Tracking
          </p>
          <p>
            We create heatmap tracking features for web owner to understand
                their customer's behavior.<br />
            <br />
            We offer 3 types of heatmap tracking: Click, Hover and Content
            read.
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-center p-20">
        <div
          className="flex flex-col justify-center"
          style={{ width: '600px', padding: '100px' }}
        >
          <p className="font-sans text-3xl font-bold pb-5">
            Funnel
          </p>
          <p>
            A visual way to know the traffic throughout your website. We
            create funnel, let you setup the steps and see the result of how
            your customer go through every steps.
          </p>
        </div>
        <div >
          <img src="/funnel-image.png" alt="" style={{ width: '600px' }} />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-20">
        <div className="flex flex-col justify-center items-center p-10">
          <p className="font-sans text-3xl font-bold pb-5">
            Unique Screenshots
          </p>
          <p>
            Here are some screenshots of what you're going to use.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <img src="/feature/feature-1.jpg" alt="" />
          </div>
          <div >
            <img src="/feature/feature-2.jpg" alt="" />
          </div>
          <div >
            <img src="/feature/feature-3.jpg" alt="" />
          </div>
          <div>
            <img src="/feature/feature-4.jpg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
