'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const basicTopics = [
    { href: '/', label: 'Главная' },
    { href: '/topics/coin-flip', label: 'Монета' },
    { href: '/topics/dice-roll', label: 'Кубик' },
  ]

  const advancedTopics = [
    { href: '/topics/conditional-probability', label: 'Условная вероятность' },
    { href: '/topics/binomial-distribution', label: 'Биномиальное' },
    { href: '/topics/normal-distribution', label: 'Нормальное' },
    { href: '/topics/central-limit-theorem', label: 'Центральная теорема' },
    { href: '/topics/probability-combinations', label: 'Комбинаторика' }
  ]

  const isActive = (href: string) => pathname === href

  // Обработчики для десктопного меню
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false)
    }, 300) // Задержка 300ms перед закрытием
  }

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <header className="header">
      <div className="container">
        <Link href="/" className="logo">
          🎲 PROBENG
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="nav">
          {basicTopics.map((topic) => (
            <Link 
              key={topic.href} 
              href={topic.href} 
              className={`nav-link ${isActive(topic.href) ? 'active' : ''}`}
            >
              {topic.label}
            </Link>
          ))}
          
          {/* Dropdown for advanced topics */}
          <div 
            ref={dropdownRef}
            className="dropdown-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className={`dropdown-button ${advancedTopics.some(topic => isActive(topic.href)) ? 'active' : ''}`}>
              Продвинутые темы ▼
            </button>
            
            {isDropdownOpen && (
              <div 
                className="dropdown-menu"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {advancedTopics.map((topic) => (
                  <Link 
                    key={topic.href} 
                    href={topic.href} 
                    className={`dropdown-link ${isActive(topic.href) ? 'active' : ''}`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {topic.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="mobile-nav">
            {[...basicTopics, ...advancedTopics].map((topic) => (
              <Link 
                key={topic.href} 
                href={topic.href} 
                className={`mobile-nav-link ${isActive(topic.href) ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {topic.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}