import PropTypes from 'prop-types';
import React from 'react';
import 'core-js/fn/array/includes';
import marked from 'marked';
import styled from '@emotion/styled';

import PrettyPropType from './types/PrettyPropType';

// Table, Td, Th used to be included in @storybook/components 
// but have been removed in version 5.0
const Table = styled.table({
  borderCollapse: 'collapse',
});

Table.displayName = 'Table';

const dynamicStyles = ({ bordered, code }) => ({
  ...(bordered ? { border: '1px solid #ccc' } : {}),
  ...(code
    ? {
        whiteSpace: 'nowrap',
        fontFamily: 'Monaco, Consolas, "Courier New", monospace',
      }
    : {}),
});

const styles = {
  padding: '2px 6px',
};

export const Td = styled.td(styles, dynamicStyles);
export const Th = styled.th(styles, dynamicStyles);

Td.displayName = 'Td';
Th.displayName = 'Th';

export const multiLineText = input => {
  if (!input) {
    return input;
  }
  const text = String(input);
  const arrayOfText = text.split(/\r?\n|\r/g);
  const isSingleLine = arrayOfText.length < 2;
  return isSingleLine
    ? text
    : arrayOfText.map((lineOfText, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={`${lineOfText}.${i}`}>
          {i > 0 && <br />} {lineOfText}
        </span>
      ));
};

const determineIncludedPropTypes = (propDefinitions, excludedPropTypes) => {
  if (excludedPropTypes.length === 0) {
    return propDefinitions;
  }

  return propDefinitions.filter(
    propDefinition => !excludedPropTypes.includes(propDefinition.property)
  );
};

export default function PropTable(props) {
  const {
    type,
    maxPropObjectKeys,
    maxPropArrayLength,
    maxPropStringLength,
    propDefinitions,
    excludedPropTypes,
  } = props;

  if (!type) {
    return null;
  }

  const includedPropDefinitions = determineIncludedPropTypes(propDefinitions, excludedPropTypes);

  if (!includedPropDefinitions.length) {
    return <small>No propTypes defined!</small>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th bordered>property</Th>
          <Th bordered>propType</Th>
          <Th bordered>required</Th>
          <Th bordered>default</Th>
          <Th bordered>description</Th>
        </tr>
      </thead>
      <tbody>
        {includedPropDefinitions.map(row => (
          <tr key={row.property}>
            <Td bordered code>
              {row.property}
            </Td>
            <Td bordered code style={{ fontSize: '14px', whiteSpace: 'pre-wrap' }}>
              <PrettyPropType propType={row.propType} />
            </Td>
            <Td bordered>{row.required ? 'yes' : '-'}</Td>
            <Td bordered code style={{  fontSize: '14px', whiteSpace: 'pre-wrap' }}>
              {row.defaultValue === undefined ? (
                '-'
              ) : (
                <span style={{ color: 'rgb(34, 34, 170)' }}>{row.defaultValue}</span>
              )}
            </Td>
            <Td bordered>
              <div
                style={{ marginBottom: '-16px', overflow: 'hidden' }}
                dangerouslySetInnerHTML={{ __html: marked(row.description) }}
                />
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

PropTable.displayName = 'PropTable';
PropTable.defaultProps = {
  type: null,
  propDefinitions: [],
  excludedPropTypes: [],
};
PropTable.propTypes = {
  type: PropTypes.func,
  maxPropObjectKeys: PropTypes.number.isRequired,
  maxPropArrayLength: PropTypes.number.isRequired,
  maxPropStringLength: PropTypes.number.isRequired,
  excludedPropTypes: PropTypes.arrayOf(PropTypes.string),
  propDefinitions: PropTypes.arrayOf(
    PropTypes.shape({
      property: PropTypes.string.isRequired,
      propType: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      required: PropTypes.bool,
      description: PropTypes.string,
      defaultValue: PropTypes.any,
    })
  ),
};
