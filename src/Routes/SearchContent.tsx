import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IGetSearchResult, searchData } from "../api";
import { slideCnt } from "../atoms";
import { makeImagePath, NoSearchDataImage } from "../utils";

const Row = styled.div`
  position: absolute;
  left: 0;
  margin: -0.3rem;
  margin-bottom: 3rem;
  width: 100%;
  clear: both;
  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

const Box = styled(motion.div)<{ bgphoto: string; offset: number }>`
  display: block;
  float: left;
  margin: 0.3rem;
  width: calc(100% / ${(props) => props.offset} - 0.6rem);
  height: 16rem;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  font-size: 4rem;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }

  /* @media only screen and (max-width: 800px) {
    height: 13rem;
  }
  @media only screen and (max-width: 280px) {
    height: 18rem;
  } */
`;

const Info = styled(motion.div)`
  position: relative;
  top: 15.8rem;
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 1.8rem;
  }
`;

const NoSearchData = styled.div<{ imgUrl: string }>`
  position: absolute;
  top: 39%;
  transform: translateY(-50%);
  padding-top: 8rem;
  width: 100%;
  text-align: center;
  font-size: 2.8rem;
  font-weight: 500;
  background: url(${(props) => props.imgUrl}) no-repeat center top;
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.3,
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.3,
    },
  },
};

function SearchContent({ keyword }: { keyword: string }) {
  const offset = useRecoilValue(slideCnt);
  const { data } = useQuery<IGetSearchResult>(
    ["search", keyword],
    () => searchData(keyword || ""),
    { useErrorBoundary: true }
  );

  const navigate = useNavigate();
  const onBoxClicked = (menuName: string, id: number) => {
    navigate(`/search/${menuName}/${id}?keyword=${keyword}`);
  };

  return (
    <>
      {data && data.results.length > 0 ? (
        <Row>
          {data?.results.map((d) => (
            <Box
              layoutId={d.id + "" + d.media_type}
              key={d.id}
              variants={boxVariants}
              initial="normal"
              whileHover="hover"
              transition={{ type: "tween" }}
              bgphoto={makeImagePath(d.backdrop_path || "", "w500")}
              offset={offset}
              onClick={() => onBoxClicked(d.media_type, d.id)}
            >
              <Info variants={infoVariants}>
                <h4>{d.title ? d.title : d.name}</h4>
              </Info>
            </Box>
          ))}
        </Row>
      ) : (
        <NoSearchData imgUrl={NoSearchDataImage() || ""}>
          There is no such content related to '{keyword}'.
        </NoSearchData>
      )}
    </>
  );
}

export default SearchContent;
