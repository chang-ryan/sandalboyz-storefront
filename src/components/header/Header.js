import React from 'react'
import styled from 'react-emotion'
import { Context } from 'src/layouts/index'
// Components
import Link from 'gatsby-link'
import Hamburger from 'src/components/hamburger/Hamburger'
import FloatingMenu from './FloatingMenu'
import FullScreenMenu from './FullScreenMenu'
// Assets
import circleLogo from 'src/assets/img/sandalboyz-logo.png'
import textLogo from 'src/assets/img/sandalboyz-text-logo.png'

const TOP = 'top'
const SCROLLED = 'scrolled'
const HOVER = 'hover'

export const HeaderContainer = styled('header')`
  position: sticky;
  width: 100%;
  top: 0;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 0.6em 0.8em;
  z-index: 10;
`

export const HeaderBar = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 5px;
  height: 30px;
  background-color: ${({ level, menuOpen, theme }) => {
    if (level !== TOP && menuOpen) return theme.offWhite
    if (level === HOVER) return 'rgba(0, 0, 0, 0.3)'
    else return 'rgba(0, 0, 0, 0)'
  }};
  border-radius: 3px;
  border-bottom-left-radius: ${({ menuOpen }) => menuOpen ? 0 : '3px'};
  border-bottom-right-radius: ${({ menuOpen }) => menuOpen ? 0 : '3px'};
  transition: ${({ menuOpen }) => menuOpen
    ? 'background-color 0.3s ease'
    : 'background-color 0.3s 0.15s ease'
};
`

export const CircleLogo = styled('div')`
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${circleLogo});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 80px;
  width: 80px;
  opacity: ${props => props.level === TOP ? 1 : 0};
  transition: opacity 0.15s 0.1s ease;
`

export const TextLogo = styled('div')`
  background-image: url(${textLogo});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 20px;
  width: 100px;
  transform: ${props => props.level === TOP ? 'scale(0)' : 'scale(1)'};
  opacity: ${props => props.level === TOP ? 0 : 1};
  transition: transform 0.25s ease, opacity 0.15s 0.1s ease;
`

export const Bag = styled('button')`
  border: 0;
  outline: 0;
  border-radius: 50%;
  background-color: #000000;
  height: 24px;
  width: 24px;
  line-height: 24px;
  text-align: center;
  color: #FFFFFF;
`

class Header extends React.Component {
  state = {
    yPosition: 0
  }

  componentDidMount () {
    this.setState({ yPosition: window.scrollY })

    document.addEventListener('scroll', () => {
      this.setState({ yPosition: window.scrollY })
    })
  }

  level () {
    const { yPosition } = this.state
    if (yPosition >= 0 && yPosition < 5) return TOP
    if (yPosition >= 5 && yPosition < 30) return SCROLLED
    if (yPosition >= 30) return HOVER
  }

  shouldRenderFloatingMenu () {
    return this.level() === HOVER
  }

  shouldRenderFullScreenMenu () {
    return this.level() === TOP || this.level() === SCROLLED
  }

  render () {
    return (
      <Context.Consumer>
        {context => (
          <React.Fragment>
            <HeaderContainer level={this.level()}>
              <HeaderBar level={this.level()} menuOpen={context.menuOpen}>
                <Hamburger />
                <Link to='/'>
                  <TextLogo level={this.level()} />
                </Link>
                <Bag onClick={context.addToBag}>{context.bag}</Bag>
              </HeaderBar>
              <CircleLogo level={this.level()} />
              { (this.shouldRenderFloatingMenu() && context.menuOpen) &&
                <FloatingMenu />
              }
            </HeaderContainer>
            { (this.shouldRenderFullScreenMenu() && context.menuOpen) &&
              <FullScreenMenu yPosition={this.state.yPosition} />
            }
          </React.Fragment>
        )}
      </Context.Consumer>
    )
  }
}

export default Header
