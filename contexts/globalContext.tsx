import { createContext, FC, ReactElement, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ConnectionProvider, useConnection, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    SolflareWalletAdapter,
    PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
    useWalletModal
} from '@solana/wallet-adapter-react-ui';
import toast, { Toaster } from 'react-hot-toast'
import { clusterApiUrl } from '@solana/web3.js';
import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
// require('@solana/wallet-adapter-react-ui/styles.css');
import { QueryClient, QueryClientProvider } from 'react-query';
// import { trpc } from './utils/trpc';
export type State = {
    storeName: string;
    loggedIn: boolean;
    email: string;
    isCheckingOut?: boolean;
    sidebarOpened: boolean;
}
type GlobalProviderProps = {
    state: State;
    setState<T>(state: T | ((state: T) => T)): void;
    // logIn(data:{isGuest:boolean, email?:string,storeName?:string}):boolean;
}
// |((state:T) => T)
const Global = createContext<GlobalProviderProps>(null!)

const GlobalProvider: FC<{ children: ReactElement }> = ({ children }) => {


    const initialState: State = {
        storeName: '',
        loggedIn: true,
        isCheckingOut: false,
        email: '',
        sidebarOpened: true

    }

    const network = WalletAdapterNetwork.Testnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const [state, setState] = useState<State>(initialState)


    const [queryClient] = useState(() => new QueryClient());
    //   const [trpcClient] = useState(() =>
    //     trpc.createClient({
    //       url: 'http://localhost:5173/trpc',
    //     }),
    //   );


    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter()
        ],
        []
    )

    useEffect(() => {
        if (typeof window != undefined) {
            let width = window.innerWidth
            if (window.innerHeight < 768) {
                setState((state: State) => ({ ...state, sidebarOpened: false }))
            }
        }
    }, [])

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect={true} onError={(e) => {
                if (e.message) {
                    console.log(e)
                    toast.error(e.message)
                }
            }}>
                <WalletModalProvider>
                    <Global.Provider value={{
                        state,
                        // @ts-ignore
                        setState,
                    }}>
                        {/* <trpc.Provider client={trpcClient} queryClient={queryClient}> */}
                        <QueryClientProvider client={queryClient}>
                            <Toaster position="top-right" reverseOrder={false} />
                            {children}
                        </QueryClientProvider>
                        {/* </trpc.Provider> */}
                    </Global.Provider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}


export const useGlobal = () => {
    let context = useContext(Global)
    return context
}

export default GlobalProvider