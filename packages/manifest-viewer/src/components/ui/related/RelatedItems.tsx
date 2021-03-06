import {Domain, resolveCreator} from 'collections-ui-common'
import React from 'react'
import {ActionBar, ActionBarRow, HitsStats, NoHits, PageSizeSelector, Pagination, SearchkitManager, SearchkitProvider,
  Select} from 'searchkit'
import {RelatedHits} from './RelatedHits'
const manifesto = require('manifesto-fork')

export class RelatedItems extends React.Component<any, any> {
  static defaultProps = {
    host: process.env.REACT_APP_ELASTICSEARCH_HOST,
    options: {
      timeout: 20000,
      searchUrlPath : "_search?rest_total_hits_as_int=true",
      useHistory: false},
  }

  static simpleQuery(terms) {
    return {
      simple_query_string: {
        analyzer: 'stop',
        default_operator: 'or',
        query: terms,
      },
    }
  }

  static multiMatchQuery(terms) {
    return {
      multi_match: {
        analyzer: 'stop',
        fields: ['author^1.1', 'Author^1.1', 'Artist^1.1', 'creators^1.1', 'Creator(s)^1.1', 'People^1.1', 'title^0.8', 'Title^0.8',
          'Titles^0.8', 'Title (English)', 'description^0.3'],
        query: terms,
      },
    }
  }

  host: string
  options: any
  searchkit: SearchkitManager

  constructor(props) {
    super(props)
    const host = props.host + Domain.RELATED_INDICES
    this.options = props.options
    this.searchkit = new SearchkitManager(host, this.options)
  }

  render() {
    const {document} = this.props
    if (document) {
      const title = manifesto.LanguageMap.getValue(document.getLabel())
      this.searchkit.addDefaultQuery((query) => query.addQuery(RelatedItems.multiMatchQuery(title)))
      return (
        <SearchkitProvider searchkit={this.searchkit}>
          <main>
            <ActionBar>
              <ActionBarRow>
                <HitsStats translations={{'hitstats.results_found': '{hitCount} results found'}}/>
                <PageSizeSelector listComponent={Select} options={[10, 20, 50]}/>
              </ActionBarRow>
            </ActionBar>
            <Pagination showNumbers={true}/>
            <div style={{display: 'flex'}}>
              <RelatedHits/>
            </div>
            <NoHits/>
          </main>
        </SearchkitProvider>
      )
    } else {
      return null
    }
  }
}
