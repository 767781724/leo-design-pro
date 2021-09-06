import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import React, { FC, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { FBreadcrumb, FHeader, FMenu, FRouteView } from '@src/component';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import intl from 'react-intl-universal';
import { RootState } from '@src/store';
import { IMenuConfigs } from '@src/types/model/menu';

const { Sider, Content } = Layout;

const PREFIX = 'basic-layout';

type IBasicLayoutProps = {} & ReturnType<typeof mapStateToProps>;
type IPathItemProps = {
  path?: string;
  name: string;
};
// 将menu列表转成path对应的一维数组
const flattenRoutes = (arr: IMenuConfigs[]): IPathItemProps[] =>
  arr.reduce(function (prev: IPathItemProps[], item) {
    prev.push({ name: item.name, path: item.path || '/' });
    return prev.concat(Array.isArray(item.children) ? flattenRoutes(item.children) : []);
  }, []);
const getBreadcrumb = (
  flattenRoutes: IPathItemProps[],
  curSection: string,
  pathSection: string
) => {
  const matchRoute = flattenRoutes.find((ele) => {
    const { path } = ele;
    return pathSection === path;
  });
  // 返回breadcrumb的值，没有就返回原匹配子路径名
  if (matchRoute) {
    return matchRoute;
  } else {
    return {
      name: pathSection === '/' ? '首页' : curSection,
      path: pathSection,
    };
  }
};
const getBreadcrumbs = (flattenRoutes: IPathItemProps[], pathname: string) => {
  // 初始化匹配数组match
  let matches: any[] = [];
  pathname.split('/').reduce((prev, curSection) => {
    // 将最后一个路由部分与当前部分合并，比如当路径为 `/x/xx/xxx` 时，pathSection分别检查 `/x` `/x/xx` `/x/xx/xxx` 的匹配，并分别生成面包屑
    const pathSection = `${prev}/${curSection}`;
    if (!!curSection) {
      const breadcrumb = getBreadcrumb(flattenRoutes, curSection, pathSection);
      matches.push(breadcrumb);
    }

    return pathSection;
  });
  return matches;
};
const BasicLayout: FC<IBasicLayoutProps> = ({ menus, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const breakPoint = (broken: boolean) => {
    setCollapsed(broken);
  };
  const location = useLocation();

  const breadcrumbs = getBreadcrumbs(flattenRoutes(menus), location.pathname);
  const currentPage = breadcrumbs[breadcrumbs.length - 1];

  return (
    <Layout className={styles[PREFIX]}>
      <Sider
        width={240}
        breakpoint="lg"
        className={styles[`${PREFIX}-sider`]}
        trigger={null}
        collapsible
        collapsed={collapsed}
        onBreakpoint={breakPoint}
      >
        <div className={styles[`${PREFIX}-logo`]}>
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt="头像"
          />
          {!collapsed && <span>{intl.get('platform_name')}</span>}
        </div>
        <FMenu menuList={menus} />
        <TriggerBtn toggle={toggle} collapsed={collapsed} />
      </Sider>
      <Layout>
        <FHeader title={currentPage?.name} />
        <Content className={styles[`${PREFIX}-content`]}>
          <FBreadcrumb breadcrumbs={breadcrumbs} />
          <div className={styles[`${PREFIX}-content-main`]}>
            <FRouteView animation={true}>{children}</FRouteView>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
type ITriggerBtnProp = {
  collapsed: boolean;
  toggle: () => void;
};
const TriggerBtn = ({ collapsed, toggle }: ITriggerBtnProp) => {
  return (
    <div
      className={classNames(styles[`${PREFIX}-trigger`], {
        [styles['collapse']]: collapsed,
      })}
    >
      <div className={styles['icon-bg']} onClick={toggle}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: styles['icon'],
          onClick: toggle,
        })}
      </div>
    </div>
  );
};
const mapStateToProps = (state: RootState) => {
  return { menus: state.user.menus };
};
export default connect(mapStateToProps)(BasicLayout);
