import React, { createContext, useContext, useEffect, useState } from "react";

interface TokenAuthContextType {
    userId: number | null;
    isLoading: boolean;
}

const TokenAuthContext = createContext<TokenAuthContextType | undefined>(undefined);

export const TokenAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleHandshake = async () => {
            /* --- BYPASS FOR TESTING MODE ---
            // Remove or comment out this block for production
            const mockUserId = 123456789; // Mock BIGINT user ID
            sessionStorage.setItem("user_id", mockUserId.toString());
            setUserId(mockUserId);
            setIsLoading(false);
            return;
            ------------------------------- */

            const searchParams = new URLSearchParams(window.location.search);
            const token = searchParams.get("token");
            const storedUserId = sessionStorage.getItem("user_id");

            if (storedUserId) {
                setUserId(parseInt(storedUserId, 10));
                setIsLoading(false);
                return;
            }

            if (!token) {
                if (window.location.pathname !== "/token") {
                    window.location.href = "/token";
                } else {
                    setIsLoading(false);
                }
                return;
            }

            try {
                const response = await fetch("https://api.mantracare.com/user/user-info", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const id = data.user_id;
                    sessionStorage.setItem("user_id", id.toString());
                    setUserId(id);

                    // Clean URL
                    const newUrl = window.location.pathname + window.location.hash;
                    window.history.replaceState({}, document.title, newUrl);
                } else {
                    if (window.location.pathname !== "/token") {
                        window.location.href = "/token";
                    }
                }
            } catch (error) {
                console.error("Auth handshake failed:", error);
                if (window.location.pathname !== "/token") {
                    window.location.href = "/token";
                }
            } finally {
                setIsLoading(false);
            }
        };

        handleHandshake();
    }, []);

    return (
        <TokenAuthContext.Provider value={{ userId, isLoading }}>
            {children}
        </TokenAuthContext.Provider>
    );
};

export const useTokenAuth = () => {
    const context = useContext(TokenAuthContext);
    if (context === undefined) {
        throw new Error("useTokenAuth must be used within a TokenAuthProvider");
    }
    return context;
};
