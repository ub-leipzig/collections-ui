import * as React from "react";
import {HeadProvider, Meta, Title} from 'react-head'
import {Domain} from "../../constants";

export class HeadMeta extends React.Component<any, any> {
  render() {
    return (
      <HeadProvider>
        <Title>{Domain.LOGO_TEXT}</Title>
        <Meta property='og:site_name' content={Domain.LOGO_TEXT}/>
        <Meta property='og:type' content='website'/>
        <Meta property='og:url' content={window.location.href}/>
        <Meta property='og:title' content={Domain.LOGO_TEXT}/>
        <Meta property='og:image' content={Domain.LOGO_URL}/>
      </HeadProvider>
    )
  }
}
