import { Link, useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 10px;
  padding: clamp(13px, 2vw, 16px) clamp(20px, 4vw, 50px);
  color: ${(props) => props.theme.white.primary};
  z-index: 100;

  @media (max-width: 768px) {
    font-size: 8px;
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    &:first-child {
      flex: 1;
    }
  }
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 85px;
  height: 20px;
  fill: ${(props) => props.theme.red};

  @media (max-width: 768px) {
    width: 60px;
    height: 15px;
    margin-right: 20px;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    /* display: none; // 모바일에서 메뉴 숨기기 */
  }
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.primary};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Search = styled.form`
  color: ${(props) => props.theme.white.primary};
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 20px;

    @media (max-width: 768px) {
      height: 15px;
    }
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  bottom: -6px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 15px;
  padding-left: 10px;
  color: ${(props) => props.theme.white.primary};
  font-size: 12px;
  background-color: transparent;
  outline: none;
  border: 1px solid ${(props) => props.theme.white.primary};
  &::placeholder {
    color: ${(props) => props.theme.white.primaryTransparent};
  }

  @media (max-width: 768px) {
    width: 150px;
    font-size: 10px;
  }
`;

interface IForm {
  keyword: string;
}

function Header() {
  const homeMatch = useMatch("/browse");
  const moviesMatch = useMatch("/browse/movies");
  const seriesMatch = useMatch("/browse/series");
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IForm>();

  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
  };

  return (
    <Nav
      animate={{
        backgroundColor: isScrolled ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.3 }}
    >
      <Col>
        <Link to="/browse">
          <Logo
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 276.742"
          >
            <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
          </Logo>
        </Link>
        <Items>
          <Item>
            <Link to="/browse">
              Home {homeMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/browse/movies">
              Movies {moviesMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/browse/series">
              Series {seriesMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -160 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 30 30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            transition={{ type: "linear" }}
            placeholder="Search for contents..."
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;

//jetflix
