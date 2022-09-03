import styled, { keyframes } from "styled-components";

const baseColor = "#282890";
const gradientKeyframes = keyframes`
  0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;

export const Header = styled.header`
  background-color: ${baseColor};
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: white;
  padding-right: 20px;
`;

export const Input = styled.input`
  background-color: white;
  border: none;
  border-radius: 8px;
  color: ${baseColor};
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 0px 20px;
  padding: 12px 24px;
`;

export const Body = styled.div`
  align-items: center;
  background-color: ${baseColor};
  background: linear-gradient(
    45deg,
    rgba(2, 0, 36, 1),
    rgba(9, 9, 121, 1),
    rgba(0, 120, 120, 1),
    rgba(120, 120, 25, 1)
  );
  background-size: 200% 200%;
  animation: ${gradientKeyframes} 30s ease infinite;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: calc(100vh - 70px);
  padding: 20px;
`;

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: #61dafb;
  margin-top: 10px;
`;

export const Button = styled.button`
  background-color: white;
  border: none;
  border-radius: 8px;
  color: ${baseColor};
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 0px 20px;
  padding: 12px 24px;

  ${(props) => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }
`;

export const P = styled.p`
  font-size: 12px;
`;
