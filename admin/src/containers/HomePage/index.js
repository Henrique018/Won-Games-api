import React, { memo, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { get, upperFirst } from 'lodash';
import { auth, LoadingIndicatorPage } from 'strapi-helper-plugin';
import PageTitle from '../../components/PageTitle';
import { useModels } from '../../hooks';

import useFetch from './hooks';
import { ALink, Block, Container, LinkWrapper, P, Separator } from './components';
import BlogPost from './BlogPost';
import SocialLink from './SocialLink';

const FIRST_BLOCK_LINKS = [
  {
    link:
      'https://strapi.io/documentation/v3.x/getting-started/quick-start.html#_4-create-a-category-content-type',
    contentId: 'app.components.BlockLink.documentation.content',
    titleId: 'app.components.BlockLink.documentation',
  },
  {
    link: 'https://github.com/strapi/foodadvisor',
    contentId: 'app.components.BlockLink.code.content',
    titleId: 'app.components.BlockLink.code',
  },
];

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    link: 'https://github.com/Henrique018/',
  },
  {
    name: 'Slack',
    link: 'https://bit.ly/will-slack',
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com/strapijs',
  },
];

const HomePage = ({ history: { push } }) => {
  const { error, isLoading, posts } = useFetch();
  // Temporary until we develop the menu API
  const { collectionTypes, singleTypes, isLoading: isLoadingForModels } = useModels();

  const handleClick = e => {
    e.preventDefault();

    push(
      '/plugins/content-type-builder/content-types/plugins::users-permissions.user?modalType=contentType&kind=collectionType&actionType=create&settingType=base&forTarget=contentType&headerId=content-type-builder.modalForm.contentType.header-create&header_icon_isCustom_1=false&header_icon_name_1=contentType&header_label_1=null'
    );
  };

  const hasAlreadyCreatedContentTypes = useMemo(() => {
    const filterContentTypes = contentTypes => contentTypes.filter(c => c.isDisplayed);

    return (
      filterContentTypes(collectionTypes).length > 1 || filterContentTypes(singleTypes).length > 0
    );
  }, [collectionTypes, singleTypes]);

  if (isLoadingForModels) {
    return <LoadingIndicatorPage />;
  }

  const headerId = hasAlreadyCreatedContentTypes
    ? 'HomePage.greetings'
    : 'app.components.HomePage.welcome';
  const username = get(auth.getUserInfo(), 'username', '');
  const linkProps = hasAlreadyCreatedContentTypes
    ? {
        id: 'app.components.HomePage.button.blog',
        href: 'https://strapi.io/blog/',
        onClick: () => {},
        type: 'blog',
        target: '_blank',
      }
    : {
        id: 'app.components.HomePage.create',
        href: '',
        onClick: handleClick,
        type: 'documentation',
      };

  return (
    <>

      <PageTitle title="Won Games Dashboard" />
      <Container className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <Block>
              <FormattedMessage
                id={headerId}
                values={{
                  name: upperFirst(username),
                }}
              >
                {() => <h2 id="mainHeader">Won Games DashBoard</h2>}
              </FormattedMessage>
              {hasAlreadyCreatedContentTypes ? (
                <FormattedMessage id="app.components.HomePage.welcomeBlock.content.again">
                  {() => <P>No menu ao lado, cadastre jogos, adicione categorias, e editoras em nossa Loja!</P>}
                </FormattedMessage>
              ) : (
                <FormattedMessage id="HomePage.welcome.congrats">
                  {congrats => {
                    return (
                      <FormattedMessage id="HomePage.welcome.congrats.content">
                        {content => {
                          return (
                            <FormattedMessage id="HomePage.welcome.congrats.content.bold">
                              {boldContent => {
                                return (
                                  <P>
                                    <b>{congrats}</b>&nbsp;
                                    {content}&nbsp;
                                    <b>{boldContent}</b>
                                  </P>
                                );
                              }}
                            </FormattedMessage>
                          );
                        }}
                      </FormattedMessage>
                    );
                  }}
                </FormattedMessage>
              )}

              <Separator style={{ marginTop: 37, marginBottom: 36 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {FIRST_BLOCK_LINKS.map((data, index) => {
                  const type = index === 0 ? 'doc' : 'code';

                  return (
                    <LinkWrapper href={data.link} target="_blank" key={data.link} type={type}>
                      <FormattedMessage id={data.titleId}>
                        {title => <p className="bold">{title}</p>}
                      </FormattedMessage>
                      <FormattedMessage id={data.contentId}>
                        {content => <p>{content}</p>}
                      </FormattedMessage>
                    </LinkWrapper>
                  );
                })}
              </div>
            </Block>
          </div>

          <div className="col-md-12 col-lg-4">
            <Block style={{ paddingRight: 30, paddingBottom: 0 }}>
              <FormattedMessage id="HomePage.community">{() => <h2>Acesse nossos links!</h2>}</FormattedMessage>
              <FormattedMessage id="app.components.HomePage.community.content">
                {() => <P style={{ marginTop: 7, marginBottom: 0 }}>Em caso de duvidas, acesse os links abaixo</P>}
              </FormattedMessage>
              <FormattedMessage id="HomePage.roadmap">
                {() => (
                  <ALink
                    rel="noopener noreferrer"
                    href="https://www.reactavancado.com.br"
                    target="_blank"
                  >
                    Veja nosso sistema de módulos
                  </ALink>
                )}
              </FormattedMessage>

              <Separator style={{ marginTop: 18 }} />
              <div
                className="row social-wrapper"
                style={{
                  display: 'flex',
                  margin: 0,
                  marginTop: 36,
                  marginLeft: -15,
                }}
              >
                {SOCIAL_LINKS.map((value, key) => (
                  <SocialLink key={key} {...value} />
                ))}
              </div>
            </Block>
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
