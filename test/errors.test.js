import { createWebpackConfig, runWebpack } from './helpers/webpack'

it('adds error if Sentry organisation slug is missing', () =>
  runWebpack(createWebpackConfig({ organisation: null })).catch(({
    errors,
  }) => {
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(
      'Sentry Plugin: Error: Must provide organisation',
    )
  }))

it('adds error if Sentry project name is missing', () =>
  runWebpack(createWebpackConfig({ project: null })).catch(({
    errors,
  }) => {
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual('Sentry Plugin: Error: Must provide project')
  }))

it('adds error if Sentry api key is missing', () =>
  runWebpack(createWebpackConfig({ apiKey: null })).catch(({
    errors,
  }) => {
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual('Sentry Plugin: Error: Must provide api key')
  }))

it('adds error if release version is missing', () =>
  runWebpack(createWebpackConfig()).catch(({ errors }) => {
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(
      'Sentry Plugin: Error: Must provide release version',
    )
  }))

it('adds release error to compilation', () =>
  runWebpack(createWebpackConfig({ release: 'bad-release' })).catch(({
    errors,
  }) => {
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual('Sentry Plugin: Error: Release request error')
  }))

it('adds upload error to compilation', () =>
  runWebpack(createWebpackConfig({ release: 'bad-upload' })).catch(({
    errors,
  }) => {
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual('Sentry Plugin: Error: Upload request error')
  }))
