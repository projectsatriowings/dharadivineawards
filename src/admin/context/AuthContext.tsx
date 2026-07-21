import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserType {
  username: string;
  email?: string;
  role?: string;
  name?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('df_admin_auth');
    const storedUser = localStorage.getItem('df_admin_user');
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser({ username: 'admin' });
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const lowerUser = username.toLowerCase().trim();
    if (
      (lowerUser === 'admin' && password === 'admin123') ||
      (lowerUser.endsWith('@dhara.org') && password.length >= 4)
    ) {
      const newUser: UserType = {
        username: lowerUser === 'admin' ? 'admin' : lowerUser.split('@')[0],
        email: lowerUser === 'admin' ? 'vinoth@dhara.org' : lowerUser,
        name: lowerUser === 'admin' ? 'S. Vinoth Ragavendran' : lowerUser.split('@')[0].toUpperCase(),
      };
      setIsAuthenticated(true);
      setUser(newUser);
      localStorage.setItem('df_admin_auth', 'true');
      localStorage.setItem('df_admin_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('df_admin_auth');
    localStorage.removeItem('df_admin_user');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF8] dark:bg-[#121310] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-10 rounded-full border-4 border-[#401C0C] border-t-transparent animate-spin mb-4"></div>
          <p className="text-sm font-serif text-[#867463] dark:text-[#9CA3AF]">Loading secure portal...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
