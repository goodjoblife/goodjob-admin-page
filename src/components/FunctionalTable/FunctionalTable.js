// @flow
import React from 'react';
import { Table } from 'antd';
import { compose, withState, withHandlers } from 'recompose';

import {
  type Column,
  withActionColumnAppended,
  withColumnsSearchable,
  withColumnsSortable
} from '../../shared/hoc/withColumnsEnhanced';

import EditModal from './EditModal';

import './FunctionalTable.css';

type Data = { [string]: any };

type Props = {
  isLoading: boolean,

  selectedRowKeys: Array<string>,
  onSelectChange: (selectedRowKeys: Array<string>) => void,

  dataSource: Array<Data>,
  columns: Array<Column>,

  isEditModalVisible: boolean,
  handleOk: () => void,
  handleCancel: () => void,

  form: Data,
  setFormField: (field: string) => (e: Event) => void,
  displayedFormFields: Array<string>,

  nData: number,
  page: number,
  pageSize: number,
  handleTableChange: (pagination: { [string]: any }) => void,

  size: string
};

const FunctionalTable = ({
  isLoading,

  selectedRowKeys,
  onSelectChange,

  dataSource,
  columns,

  isEditModalVisible,
  handleOk,
  handleCancel,

  form,
  setFormField,
  displayedFormFields,

  nData,
  page,
  pageSize,
  handleTableChange,

  size
}: Props) => (
  <React.Fragment>
    <EditModal
      title="Edit"
      visible={isEditModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      form={form}
      setFormField={setFormField}
      displayedFields={displayedFormFields}
    />
    <Table
      rowSelection={{
        selectedRowKeys,
        onChange: onSelectChange
      }}
      dataSource={dataSource}
      columns={columns}
      pagination={{
        total: nData,
        pageSize,
        current: page
      }}
      onChange={handleTableChange}
      scroll={{ x: columns.map(() => 200).reduce((a, b) => a + b, 0) }}
      loading={isLoading}
      size={size}
    />
  </React.Fragment>
);

const withSelectedRowKeys = compose(
  withState('selectedRowKeys', 'setSelectedRowKeys', []),
  withHandlers({
    onSelectChange: ({ setSelectedRowKeys }) => selectedRowKeys => {
      setSelectedRowKeys(selectedRowKeys);
    }
  })
);

const withForm = compose(
  withState('form', 'setForm', {}),
  withHandlers({
    setFormField: ({ form, setForm }) => field => value => {
      setForm({
        ...form,
        [field]: value
      });
    }
  })
);

const withEditModal = compose(
  withState('isEditModalVisible', 'setEditModalVisible', false),
  withHandlers({
    handleOk: ({ updateArchive, form, setEditModalVisible }) => async () => {
      try {
        await updateArchive(
          form._id,
          form.archive_status,
          form.archive_status ? form.archive_reason : ''
        );
        setEditModalVisible(false);
      } catch (error) {
        console.error(error);
      }
    },
    handleCancel: ({ setEditModalVisible }) => () => {
      setEditModalVisible(false);
    }
  })
);

const enhance = compose(
  withSelectedRowKeys,
  withForm,
  withEditModal,
  withColumnsSearchable,
  withColumnsSortable,
  withActionColumnAppended
);

export default enhance(FunctionalTable);
