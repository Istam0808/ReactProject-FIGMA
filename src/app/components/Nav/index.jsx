'use client'
import translations from '../../translations';
import Link from "next/link";
import "./style.scss";
import Image from "next/image";
import Logo from "../../../assets/icons/logo.png";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function Nav() {
    const pathname = usePathname();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [lang, setLang] = useState('RU');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const t = translations[lang] || translations.RU;

    useEffect(() => {
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang) {
            setLang(savedLang);
        }
        const loggedUser = localStorage.getItem('currentUser');
        if (loggedUser) {
            setCurrentUser(JSON.parse(loggedUser));
        }
    }, []);

    const handleLanguageSelect = (newLang) => {
        setLang(newLang);
        localStorage.setItem('selectedLanguage', newLang);
        setIsLangOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    };

    const handleLogoutConfirm = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        setIsLogoutModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isRegistering) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const existingUser = users.find(u => u.email === formData.email);

            if (existingUser) {
                setError(t.auth.emailExists);
                return;
            }

            users.push(formData);
            localStorage.setItem('users', JSON.stringify(users));
            setIsModalOpen(false);
            setFormData({ email: '', password: '', name: '' });
            setIsRegistering(false);
            setTimeout(() => {
                setIsModalOpen(true);
                alert(t.auth.registerSuccess);
            }, 100);
        } else {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === formData.email && u.password === formData.password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                setCurrentUser(user);
                setIsModalOpen(false);
                setFormData({ email: '', password: '', name: '' });
            } else {
                setError(t.auth.invalidCredentials);
            }
        }
    };

    return (
        <>
            <nav>
                <div className="left">
                    <Link href="/" />
                    <Image src={Logo} width={100} height={40} alt="logo" />
                </div>
                <div className="right">
                    <div className="right-left">
                        <Link href="/" className={pathname === "/" ? "active" : ""}>
                            {t.nav.about}
                        </Link>
                        <Link href="/comand" className={pathname === "/comand" ? "active" : ""}>
                            {t.nav.team}
                        </Link>
                        <Link href="/blog" className={pathname === "/blog" ? "active" : ""}>
                            {t.nav.blog}
                        </Link>
                        <Link href="/product" className={pathname === "/product" ? "active" : ""}>
                            {t.nav.products}
                        </Link>
                        <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>
                            {t.nav.contacts}
                        </Link>
                    </div>
                    <div className="right-right">
                        {currentUser ? (
                            <div className="user-account">
                                <span>{currentUser.name || currentUser.email}</span>
                                <button onClick={handleLogoutClick}>{t.nav.logout}</button>
                            </div>
                        ) : (
                            <button onClick={() => setIsModalOpen(true)}>{t.nav.login}</button>
                        )}
                        <div className="language-dropdown">
                            <div
                                className="selected-lang"
                                onClick={() => setIsLangOpen(!isLangOpen)}
                            >
                                {lang}
                            </div>
                            {isLangOpen && (
                                <div className="lang-options">
                                    <div onClick={() => handleLanguageSelect('EN')}>EN</div>
                                    <div onClick={() => handleLanguageSelect('UZ')}>UZ</div>
                                    <div onClick={() => handleLanguageSelect('KR')}>KR</div>
                                    <div onClick={() => handleLanguageSelect('TR')}>TR</div>
                                    <div onClick={() => handleLanguageSelect('RU')}>RU</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-button" onClick={() => setIsModalOpen(false)}>×</button>
                        <h2>{isRegistering ? t.auth.register : t.auth.login}</h2>
                        {error && <p className="error-message">{error}</p>}
                        <form className="login-form" onSubmit={handleSubmit}>
                            {isRegistering && (
                                <input
                                    type="text"
                                    placeholder={t.auth.name}
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            )}
                            <input
                                type="email"
                                placeholder={t.auth.email}
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="password"
                                placeholder={t.auth.password}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit">
                                {isRegistering ? t.auth.registerButton : t.auth.loginButton}
                            </button>
                        </form>
                        <p className="switch-form" onClick={() => {
                            setIsRegistering(!isRegistering);
                            setError('');
                        }}>
                            {isRegistering ? t.auth.haveAccount : t.auth.noAccount}
                        </p>
                    </div>
                </div>
            )}

            {isLogoutModalOpen && (
                <div className="modal-overlay" onClick={() => setIsLogoutModalOpen(false)}>
                    <div className="modal-content logout-confirm" onClick={e => e.stopPropagation()}>
                        <button className="close-button" onClick={() => setIsLogoutModalOpen(false)}>×</button>
                        <h2>{t.nav.confirmLogout}</h2>
                        <p className="logout-message">{t.nav.logoutMessage}</p>
                        <div className="logout-buttons">
                            <button className="confirm-btn" onClick={handleLogoutConfirm}>
                                {t.nav.confirmYes}
                            </button>
                            <button className="cancel-btn" onClick={() => setIsLogoutModalOpen(false)}>
                                {t.nav.confirmNo}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Nav;