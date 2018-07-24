import React, {Component} from 'react'

import {
  ActionBar,
  ActionBarRow,
  BoolShould,
  CheckboxFilter,
  ExistsQuery,
  GroupedSelectedFilters,
  HitsStats,
  Layout,
  LayoutBody,
  LayoutResults,
  NoHits,
  Pagination,
  RefinementListFilter,
  ResetFilters,
  SearchBox,
  SearchkitManager,
  SearchkitProvider,
  SideBar,
  SortingSelector,
  TagCloud,
  TermQuery,
  TopBar,
  ViewSwitcherHits,
  ViewSwitcherToggle
} from 'searchkit'

import {GridItem, ListItem} from 'ubl-viewer'

import '../index.css'

const host = process.env.REACT_APP_ELASTICSEARCH_HOST + process.env.REACT_APP_ATOMIC_INDEX
const searchkit = new SearchkitManager(host)
const queryFields = ["iiifService", "structureMap.1.@id", "structureMap.1.label", "metadata.Date", "metadata.Title", "metadata.Author", "metadata.Date of publication", "metadata.Call number", "metadata.Collection", "metadata.Objekttitel", "metadata.Part of", "metadata.Place", "metadata.Place of publication", "metadata.Publisher", "metadata.Sprache", "metadata.URN", "metadata.Source PPN (SWB)"]

searchkit.addDefaultQuery((query) => {
  return query.addQuery(TermQuery("imageIndex", '00000001'))
})

class Atomic extends Component {
  render () {
    return (<SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>
            <div className="my-logo"><a className="my-logo" href="/" target="_blank">UBL</a></div>
            <SearchBox autofocus={true} searchOnChange={true} queryFields={queryFields}/>
          </TopBar>
          <LayoutBody>
            <SideBar>
              <RefinementListFilter field="metadata.Sprache.keyword" title="Language" id="language"
                listComponent={TagCloud}/>
              <RefinementListFilter id="collection" title="Collection" field="metadata.Collection.keyword" orderKey="_term"
                operator="AND" listComponent={TagCloud}/>
              <RefinementListFilter id="place" title="Place" field="metadata.Place.keyword" orderKey="_term"
                operator="AND" listComponent={TagCloud}/>
            </SideBar>
            <LayoutResults>
              <ActionBar>
                <ActionBarRow>
                  <HitsStats translations={{"hitstats.results_found": "{hitCount} results found"}}/>
                  <ViewSwitcherToggle/>
                  <SortingSelector options={[{
                    label: "Index",
                    key: "index",
                    fields: [{field: "metadata.Title.keyword", options: {order: "asc"}}, {
                      field: "imageIndex",
                      options: {order: "asc"}
                    }]
                  }]}/>
                </ActionBarRow>
                <ActionBarRow>
                  <GroupedSelectedFilters/>
                  <ResetFilters/>
                </ActionBarRow>
              </ActionBar>
              <ViewSwitcherHits hitsPerPage={50} highlightFields={["metadata.Title"]} hitComponents={[{
                key: "grid",
                title: "Grid",
                itemComponent: GridItem,
                defaultOption: true
              }, {key: "list", title: "List", itemComponent: ListItem}]} scrollTo="body"/>,
              <NoHits suggestionsField={"metadata.Title"}/>
              <Pagination showNumbers={true}/>
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>)
  }
}

export default Atomic
