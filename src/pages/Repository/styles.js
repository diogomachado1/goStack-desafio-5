import styled from 'styled-components';
import * as wcag from 'wcag-contrast';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }
  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }
  h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;
export const IssueList = styled.ul`
  list-style: none;
  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    & + li {
      margin-top: 10px;
    }
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }
    & > div {
      & > div {
        display: flex;
        align-items: center;
        & > :first-child {
          margin-right: 5px;
        }
      }
      flex: 1;
      margin-left: 15px;
      strong {
        font-size: 16px;
        a {
          text-decoration: none;
          color: #333;
          &:hover {
            color: #7159c1;
          }
        }
      }
      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Label = styled.span`
  background: ${props => `#${props.color}`};
  color: ${props =>
    wcag.hex('#fff', `#${props.color}`) > wcag.hex('#333', `#${props.color}`)
      ? '#fff'
      : '#333'};
  border-radius: 2px;
  font-size: 12px;
  font-weight: 900;
  height: 20px;
  padding: 3px 4px;
  margin-left: 10px;
`;

export const Button = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.disabled,
}))`
  background: #7159c1;
  border: 0;
  padding: 5px;
  margin-left: 5px;
  border-radius: 4px;

  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Menu = styled.div`
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  & > div {
    &:first-child {
      margin-right: 10px;
    }
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 20px;
    & > div {
      margin-top: 5px;
      display: flex;
    }
  }
`;
