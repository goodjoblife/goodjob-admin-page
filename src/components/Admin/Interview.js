// @flow
import React from 'react';
import { graphql } from 'react-apollo';

import {
  withState,
  withProps,
  compose,
  type HOC,
} from 'recompose';

import { getInterviewExpQL } from '../../graphql/InterviewExperience/';
import type { ExperienceType } from '../../shared/types/experienceType';

import AdminLayout from './AdminLayout';
import FunctionalTable from '../FunctionalTable';
import WrapTable from '../../shared/hoc/WrapTable';
import withPagination from '../../shared/hoc/withPagination';

const COLUMNS = [
  { title: 'ID', dataIndex: 'id', key: 'id', filterVisible: false, width: '150px' },
  { title: '公司', dataIndex: 'company', key: 'company', searchable: true, showSearchValue: '', filterVisible: false },
  { title: '職稱', dataIndex: 'job_title', key: 'job_title', searchable: true, showSearchValue: '', filterVisible: false },
  { title: '標題', dataIndex: 'title', key: 'title', filterVisible: false },
  { title: '地區', dataIndex: 'region', key: 'region', filterVisible: false },
  { title: '封存狀態', dataIndex: 'archive_status', key: 'archive_status', filterVisible: false },
  { title: '封存理由', dataIndex: 'archive_reason', key: 'archive_reason', filterVisible: false },
];

type Props = {};

type PropsFromHOC = {
  expData: Array<ExperienceType>,
  setSearchObj: ({
    columnKey: string,
    value: string,
  }) => void,
};

const Interview = ({
  setSearchObj,
  expData,
  ...restProps
}: Props & PropsFromHOC) => (
  <AdminLayout>
    <WrapTable
      _columns={COLUMNS}
      setSearchObj={setSearchObj}
      renderProps={({
        columns,
        changeColumnSearchValue,
        setFilterVisible,
        submitSearchObj,
      }) => (
        <FunctionalTable
          columns={columns}
          dataSource={expData}
          changeColumnSearchValue={changeColumnSearchValue}
          setFilterVisible={setFilterVisible}
          submitSearchObj={submitSearchObj}
          displayedFormFields={[
            '_id',
            'title',
            'company',
            'job_title',
            'region',
          ]}
          {...restProps}
        />
      )}
    />
  </AdminLayout>
);

/* eslint-disable camelcase */

const withGraphqlData: HOC<*, Props> = compose(
  withState('searchObj', 'setSearchObj', { columnKey: 'COMPANY', value: '' }),
  graphql(getInterviewExpQL, {
    options: (props) => {
      const {
        searchObj: {
          columnKey,
          value,
        },
        page,
        pageSize,
      } = props;

      return ({
        variables: {
          queryExp: {
            search: {
              query: value,
              by: columnKey.toUpperCase(),
            },
            start: (page - 1) * pageSize,
            limit: pageSize,
          },
        },
      });
    },
  }),
  withProps(({
    data: {
      interview_experiences,
    },
  }) => {
    const _expData = (interview_experiences && interview_experiences.data) || [];
    const expData = _expData.map(data => ({
      ...data,
      id: data._id,
      key: data._id,
      company: data.company.name,
      archive_status: data.archive && data.archive.is_archive,
      archive_reason: data.archive && data.archive.reason ? data.archive.reason : null,
    }));
    const nData = interview_experiences ? interview_experiences.total : 0;

    return ({
      expData,
      nData,
    });
  }),
);

const hoc = compose(
  withPagination,
  withGraphqlData,
);

export default hoc(Interview);
