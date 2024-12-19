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

const Logo = styled(motion.img)`
  margin-right: 50px;
  width: 80px;
  height: 20px;

  @media (max-width: 768px) {
    width: 50px;
    height: 14px;
    margin-right: 20px; //!
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
  margin-right: 20px; //!
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
  cursor: pointer;
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

interface ISearchForm {
  keyword: string;
}

function Header() {
  const homeMatch = useMatch("/browse");
  const moviesMatch = useMatch("/browse/movies");
  const seriesMatch = useMatch("/browse/series");
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

  const { register, handleSubmit, setValue } = useForm<ISearchForm>();

  const onValid = (data: ISearchForm) => {
    // 추가 공백 제거한 검색어
    const trimmedKeyword = data.keyword.trim();
    if (trimmedKeyword) {
      // 공백만 있는 경우 제외
      navigate(`/search?keyword=${trimmedKeyword}`);
    }
    setValue("keyword", ""); // 검색 후 필드 초기화
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
            src="/image/jetflix-logo2.png"
            alt="JETFLEX"
          ></Logo>
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
            {...register("keyword", {
              required: true,
              minLength: 1,
              validate: {
                notOnlySpaces: (value) => value.trim().length > 0,
              },
            })}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            transition={{ type: "linear" }}
            placeholder="Search by title..."
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;

//jetflix
