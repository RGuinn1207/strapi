import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { useLayoutDnd } from '../../contexts/LayoutDnd';

import Add from '../AddDropdown';
import SortWrapper from '../SortWrapper';
import { Wrapper } from './components';
import Item from './Item';

const FieldsReorder = ({ className }) => {
  const {
    attributes,
    buttonData,
    layout,
    moveItem,
    moveRow,
    onAddData,
    removeField,
  } = useLayoutDnd();
  const getType = attributeName => {
    const attribute = get(attributes, [attributeName], {});

    if (attribute.plugin === 'upload') {
      return 'file';
    }

    return attribute.type;
  };

  return (
    <div className={className}>
      <SortWrapper>
        {layout.map((row, rowIndex) => {
          return (
            <Wrapper key={row.rowId} style={{}}>
              {row.rowContent.map((rowContent, index) => {
                const { name, size } = rowContent;

                return (
                  <Item
                    itemIndex={index}
                    key={name}
                    moveRow={moveRow}
                    moveItem={moveItem}
                    name={name}
                    removeField={removeField}
                    rowIndex={rowIndex}
                    size={size}
                    type={getType(name)}
                  />
                );
              })}
            </Wrapper>
          );
        })}
        <Wrapper style={{ marginBottom: 10 }}>
          <Add
            data={buttonData}
            onClick={onAddData}
            style={{ width: '100%', margin: '0 10px' }}
            pStyle={{ marginTop: '-2px' }}
          />
        </Wrapper>
      </SortWrapper>
    </div>
  );
};

FieldsReorder.defaultProps = {
  className: 'col-8',
};

FieldsReorder.propTypes = {
  className: PropTypes.string,
};

export default memo(FieldsReorder);
