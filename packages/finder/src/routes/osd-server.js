import React, {Component} from 'react'
import {
  ActionBar,
  DocumentViewSwitcher,
  Layout,
  LayoutBody,
  ManifestItem,
  Metadata,
  TopBar,
  ViewerManager,
  ViewerProvider
} from 'ubl-viewer'
import '../assets/index.css'
import {AuthUserProfile, AuthUserTooltip} from '../components/ui'
import * as routes from '../constants/routes';
import ReactTooltip from 'react-tooltip'

let manifest = null
let image = null
let region = null
let abstractRegion = null
let viewer

if (window.location.search && window.location.search.includes('image')) {
  const params = new URLSearchParams(window.location.search)
  image = params.get('image')
  if (params.get('region')) {
    if (!params.get('region').startsWith('pct:')) {
      region = params.get('region').split(',')
    } else {
      abstractRegion = params.get('region').substring(4).split(',')
    }
  }
  const document = image + '/info.json'
  viewer = new ViewerManager(document)
} else if (window.location.search && window.location.search.includes('manifest')) {
  const params = new URLSearchParams(window.location.search)
  manifest = params.get('manifest')
  viewer = new ViewerManager(manifest)
}

class OsdServer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    })
  }
  render () {
    const t = Boolean(true)
    return (<ViewerProvider viewer={viewer}>
        <Layout>
          <TopBar>
            <div className='my-logo-thin'><a className='my-logo' href={routes.LANDING} target='_blank'>UBL</a></div>
            <div className='profile' data-tip='authUserProfile' data-for='authUserProfile' data-event='click focus'>
              <AuthUserProfile/>
            </div>
            <ReactTooltip id='authUserProfile' offset={{left: 170}} globalEventOff='click' border={t} place='bottom' type='light' effect='solid'>
              <AuthUserTooltip/>
            </ReactTooltip>
          </TopBar>
          <ActionBar>
            <Metadata key='metadata'/>
          </ActionBar>
          <LayoutBody>
            <DocumentViewSwitcher
              viewerComponents={[{key: 'grid', title: 'Grid', itemComponent: ManifestItem, defaultOption: true}]}/>
          </LayoutBody>
        </Layout>
      </ViewerProvider>)
  }
}


export default OsdServer
