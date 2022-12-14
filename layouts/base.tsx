import { FC, ReactElement } from "react";
import { Flowbite } from "flowbite-react";
import dynamic from "next/dynamic";

const GlobalProvider = dynamic(() => import('../contexts/globalContext'), {
    ssr: false
})

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
    return (
        <Flowbite>
            <GlobalProvider>

                <section
                    className={`
                h-screen
                bg-white
                text-custom-dark
                `}
                >
                    {children}
                </section>
            </GlobalProvider>
        </Flowbite>
    );
};

export default Layout;
