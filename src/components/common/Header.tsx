import { Link, useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CircleChevronDown } from "lucide-react";

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
  margin-right: 40px;
  width: 80px;
  height: 20px;

  @media (max-width: 768px) {
    width: 50px;
    height: 14px;
    margin-right: 20px; //!
  }
`;

const Items = styled.ul<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  text-transform: uppercase;

  @media (max-width: 768px) {
    display: ${(props) => (props.$isOpen ? "flex" : "none")};
    position: absolute;
    top: 100%;
    left: 0;
    width: 130px;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.9);
    gap: 5px;
    margin-left: 5px;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.white.third};
  }
`;

const Item = styled.li`
  margin-right: 20px; //!
  color: ${(props) => props.theme.white.primary};
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-right: 0;
    width: 100%;
    padding: 15px 20px;
    font-size: 10px;
    &:hover {
      color: ${(props) => props.theme.white.third};
      border-radius: 5px;
    }
  }
`;

const MenuContainer = styled.div`
  position: relative;
`;

const MenuButton = styled.button`
  text-transform: uppercase;
  display: none;
  background: none;
  border: none;
  color: ${(props) => props.theme.white.primary};
  cursor: pointer;
  padding: 5px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
  }
`;

const MenuText = styled.span`
  display: none;
  @media (max-width: 768px) {
    display: inline;
  }
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
  @media (max-width: 768px) {
    display: none;
  }
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
  const myListMatch = useMatch("/browse/my-list");
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { register, handleSubmit, setValue, setFocus } = useForm<ISearchForm>();

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);

    if (!searchOpen) {
      setTimeout(() => {
        setFocus("keyword");
      }, 200);
    }
  };

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

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
            src="/image/jetflix-logo.png"
            alt="JETFLEX"
          ></Logo>
        </Link>
        <MenuContainer>
          <MenuButton onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
            <CircleChevronDown size={16} />
            <MenuText>menu</MenuText>
          </MenuButton>

          <Items
            $isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(false)}
          >
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
            <Item>
              <Link to="/browse/my-list">
                My List {myListMatch && <Circle layoutId="circle" />}
              </Link>
            </Item>
          </Items>
        </MenuContainer>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -155 : 0 }}
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
