import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserStatsContextType {
    totalUsers: number;
    onlineUsers: number;
    deleteAccount: () => void;
}

const UserStatsContext = createContext<UserStatsContextType | undefined>(undefined);

export const UserStatsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initial base for total users. 
    // We check localStorage to see if it was previously modified (e.g. by deletion).
    const INITIAL_BASE_USERS = 1250;

    const [totalUsers, setTotalUsers] = useState(() => {
        const stored = localStorage.getItem('app_total_users');
        return stored ? parseInt(stored, 10) : INITIAL_BASE_USERS;
    });

    const [onlineUsers, setOnlineUsers] = useState(0);
    const navigate = useNavigate();

    // Persist total users changes
    useEffect(() => {
        localStorage.setItem('app_total_users', totalUsers.toString());
    }, [totalUsers]);

    // Simulate Online Users fluctuation
    useEffect(() => {
        // Initial random value between 10% and 15% of total users
        const getSimulatedOnline = () => Math.floor(totalUsers * (0.10 + Math.random() * 0.05));

        setOnlineUsers(getSimulatedOnline());

        const interval = setInterval(() => {
            setOnlineUsers(prev => {
                // Randomly add or subtract 1-3 users to simulate activity
                const change = Math.floor(Math.random() * 5) - 2;
                return Math.max(0, prev + change);
            });
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, [totalUsers]);

    const deleteAccount = () => {
        // Decrease total users
        setTotalUsers(prev => Math.max(0, prev - 1));

        // Clear user data
        localStorage.removeItem('userName');
        localStorage.removeItem('userWeight');
        localStorage.removeItem('userHeight');
        localStorage.removeItem('userInstagram');
        localStorage.removeItem('userAvatar');
        localStorage.removeItem('userAttendance');
        localStorage.removeItem('userWeightHistory');

        // Redirect to onboarding
        navigate('/onboarding');
    };

    return (
        <UserStatsContext.Provider value={{ totalUsers, onlineUsers, deleteAccount }}>
            {children}
        </UserStatsContext.Provider>
    );
};

export const useUserStats = () => {
    const context = useContext(UserStatsContext);
    if (context === undefined) {
        throw new Error('useUserStats must be used within a UserStatsProvider');
    }
    return context;
};
