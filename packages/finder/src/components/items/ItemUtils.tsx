import {UUIDResolver} from 'manifest-uuid'
import * as React from "react";
import {Domain} from "../../constants";
import {SchemaAdapter} from "../schema";
const uuidv5 = require('uuidv5')

export function shortenTitle(source) {
  let title
  if (source.title) {
    title = source.title
  } else if (source.Title) {
    title = source.Title
  }
  if (title.length >= 80) {
    return title.substr(0, 80) + "... "
  } else {
    return title;
  }
}

export function buildImagePreview(previewUrl: string, thumbnail: string, manifest?: string) {
  if (manifest) {
    return previewUrl + '/' + manifest + '?image=' + thumbnail
  } else {
    return previewUrl + '?image=' + thumbnail
  }
}

export function buildImageView(viewerUrl: string, manifest: string) {
    return viewerUrl + '/' + manifest
}

export function getAuthor(source, bemBlocks) {
  if (source.Artist) {
    return <h3 className={bemBlocks.item('subtitle')}><b>Artist:</b> {source.Artist}</h3>
  }
}

export function getSubject(source, bemBlocks) {
  if (source['Subject(s)']) {
    return <h3 className={bemBlocks.item('subtitle')}><b>Object Type:</b> {source['Object Type']}</h3>
  }
}

export function getSchema(result, contentUrl, thumbnail, position) {
  const adapter = new SchemaAdapter(result, contentUrl, thumbnail, position)
  return adapter.buildStructuredData().dataLayer
}

export function buildGenerator(generatorUrl: string, index: string) {
  return generatorUrl + "?type=atomic&index=" + index + "&q="
}

export function buildThumbnailReference(thumbnail) {
  let thumbnailLink
  if (thumbnail) {
    thumbnailLink = thumbnail + Domain.THUMBNAIL_API_REQUEST
  } else {
    thumbnailLink = thumbnail
  }
  return thumbnailLink
}

export function buildRandomThumbnailReference(thumbnail) {
  let thumbnailLink
  if (thumbnail) {
    thumbnailLink = thumbnail + Domain.RANDOM_THUMBNAIL_API_REQUEST
  } else {
    thumbnailLink = thumbnail
  }
  return thumbnailLink
}

export function resolveName(schema) {
  if (schema.mainEntity.name) {
    return schema.mainEntity.name
  } else {
    return schema.mainEntity.alternateName
  }
}

export function resolveManifestId(source) {
  if (source.manifest) {
    return uuidv5('url', source.manifest)
  } else if (source.Manifest) {
    return uuidv5('url', source.Manifest)
  } else if (source.id) {
    return uuidv5('url', source.id)
  }
}

export function resolveThumbnailSource(source) {
  if (source.thumbnail) {
      return source.thumbnail
  } else if (source.iiifService) {
    return source.iiifService
  }
}

export function resolveThumbnail(thumbnail) {
    return thumbnail + Domain.THUMBNAIL_API_REQUEST
}