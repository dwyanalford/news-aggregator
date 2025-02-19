// pages/test-page.tsx

"use client";

export default function TestPage() {
  return (
    <div className="bg-black">
     
            <nav id="navigation" className="flex flex-row w-full h-[85px] p-2 gap-2 overflow-hidden bg-green-400 fixed z-50 top-0">
                <div className="bg-purple-400 w-1/4 flex justify-start">
                    <p className="bg-green-800">Logo branding</p>
                </div>
                <div className="bg-purple-400 w-1/2 flex justify-center">
                    <p className="bg-green-800">Main Navigation</p>
                </div>
                <div className="bg-purple-400 w-1/4 flex justify-end">
                    <p className="bg-green-800">Sign in/Account</p>
                </div>
            </nav>



            
            <header id="hero" className="fixed w-full h-[85px] mt-[85px] bg-red-300 z-40 top-0">
                <div className="flex flex-row gap-2">
                    <div className="bg-green-200 w-1/5"></div>
                    <div className="bg-green-200 w-3/5 flex flex-row">
                        <div className="bg-green-200"><p>Logo</p></div>
                        <div className="bg-green-200 flex flex-col">
                            <div className="bg-green-200"><h1>Black News</h1></div>
                            <div className="bg-green-200"><p>Launched in 2000 by Dante Lee, BlackNews.com provides the latest news for African Americans and is owned by Diversity City Media.</p>
                        </div>
                    </div>
                    </div>
                    <div className="bg-green-200 w-1/5 flex justify-end"><p>Tuesday Feb 20, 2025</p></div>
                </div>
            </header>




            <aside id="sidebar" className="fixed h-full w-[280px] bg-yellow-600 z-40 top-0"></aside>
      






        <div id="articles" className="ml-[350px] mt-[190px] bg-red-400 flex flex-wrap justify-center gap-8">
                <div className="test flex flex-col p-2 rounded-lg">
                    <div className="bg-yellow-300 h-[200px] w-full overflow-hidden"></div>
                    <div className="bg-green-300 h-[250px] w-full overflow-hidden"></div>
                </div>
                <div className="test"></div>
                <div className="test"></div>
                <div className="test"></div>
                <div className="test"></div>
                <div className="test"></div>
                <div className="test"></div>
        </div>
       
    </div>
  );
}