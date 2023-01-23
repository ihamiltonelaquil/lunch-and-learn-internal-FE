import { useRouter } from "next/navigation";
import styled, { css, keyframes } from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const fallDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  17% {
    transform: translateY(0);
  }
`;

const letterFall = css`
  animation: ${fallDown} 1s ease-out;
  animation-fill-mode: forwards;
`;

const Title = styled.h1`
  text-align: center;
`;

const Word = styled.span`
  display: inline-block;
  ${letterFall}
  animation-delay: calc(var(--animation-index) * 0.1s);
`;

const Button = styled.button`
  margin-top: 20px;
`;

export default function LandingPage() {
  const router = useRouter();
  const text = "Welcome to Lunch and Learn";

  return (
    <Container>
      <Wrapper>
        <Title>
          {text.split(" ").map((word, index) => (
            <Word key={index} style={{ "--animation-index": index }}>
              {word}{" "}
            </Word>
          ))}
        </Title>
        <Button type="button" onClick={() => router.push("/api/auth/login")}>
          Login
        </Button>
      </Wrapper>
    </Container>
  );
}
