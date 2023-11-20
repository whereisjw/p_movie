import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 120px;
  height: 55px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.span`
  color: white;
  svg {
    height: 25px;
  }
`;

const logoVars = {
  start: {
    fillOpacity: 1,
  },
  hover: {
    fillOpacity: [0, 1, 0, 1],
    transition: {
      repeat: Infinity,
    },
  },
};
const Line = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 100%;
  bottom: -15px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: ${(props) => props.theme.red};
`;
function Header() {
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  console.log(homeMatch, tvMatch);

  return (
    <Nav>
      <Col>
        <Logo
          variants={logoVars}
          initial="start"
          whileHover="hover"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 576 512">
          <motion.path d="M17.37 160.41L7 352h43.91l5.59-79.83L84.43 352h44.71l25.54-77.43 4.79 77.43H205l-12.79-191.59H146.7L106 277.74 63.67 160.41zm281 0h-47.9V352h47.9s95 .8 94.2-95.79c-.78-94.21-94.18-95.78-94.18-95.78zm-1.2 146.46V204.78s46 4.27 46.8 50.57-46.78 51.54-46.78 51.54zm238.29-74.24a56.16 56.16 0 0 0 8-38.31c-5.34-35.76-55.08-34.32-55.08-34.32h-51.9v191.58H482s87 4.79 87-63.85c0-43.14-33.52-55.08-33.52-55.08zm-51.9-31.94s13.57-1.59 16 9.59c1.43 6.66-4 12-4 12h-12v-21.57zm-.1 109.46l.1-24.92V267h.08s41.58-4.73 41.19 22.43c-.33 25.65-41.35 20.74-41.35 20.74z" />
        </Logo>
        <Items>
          <Item>
            <Link to="/">Home {homeMatch && <Line layout />}</Link>
          </Item>
          <Item>
            {" "}
            <Link to="/tv">Tv Show {tvMatch && <Line layout />}</Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"></path>
          </svg>
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
