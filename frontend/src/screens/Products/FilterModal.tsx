import React, { useCallback, useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { Category } from '../../redux/types/category';
import { useFocusEffect } from '@react-navigation/native';



interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApply }) => {
  const { categories } = useSelector((state: RootState) => state.category);
  const [activeFilter, setActiveFilter] = useState('sort');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    sort: '',
    category: '',
    price: '',
    discount: '',
  });
  const filterOptions = [
    { id: 'sort', title: 'Sort', options: ['Price: Low to High', 'Price: High to Low', 'Rating'] },
    { id: 'category', title: 'Category', options: categories.map((category: Category) => category.name) },
    { id: 'price', title: 'Price', options: ['$0 - $50', '$50 - $100', '$100 - $200', '$200+'] },
    { id: 'discount', title: 'Discount', options: ['10% or more', '20% or more', '30% or more', '50% or more'] },
  ];

  
  useFocusEffect(
    useCallback(() => {
      setSelectedFilters({
        sort: '',
        category: '',
        price: '',
        discount: '',
      });
      //code to run when the screen is focused (mounted or returned to)
      return () => {
        //clean up code to run when the screen is unfocused (unmounted or navigated away from)
      };
    }, [])
  );

  const handleSelectOption = (filterId: string, option: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterId]: option
    }));
  };

  const handleApply = () => {
    console.log('selectedFilters', selectedFilters);
    onApply(selectedFilters);
    onClose();
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      sort: '',
      category: '',
      price: '',
      discount: '',
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Filter</Text>
          <View style={styles.filterContainer}>
            <ScrollView style={styles.filterList}>
              {filterOptions.map(filter => (
                <TouchableOpacity
                  key={filter.id}
                  style={[styles.filterItem, activeFilter === filter.id && styles.activeFilterItem]}
                  onPress={() => setActiveFilter(filter.id)}
                >
                  <Text style={[styles.filterItemText, activeFilter === filter.id && styles.activeFilterItemText]}>
                    {filter.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.optionsContainer}>
              <Text style={styles.optionsTitle}>
                {filterOptions.find(f => f.id === activeFilter)?.title.toUpperCase()}
              </Text>
              {filterOptions.find(f => f.id === activeFilter)?.options.map(option => (
                <TouchableOpacity
                  key={option}
                  style={styles.optionItem}
                  onPress={() => handleSelectOption(activeFilter, option)}
                >
                  <Icon
                    name={selectedFilters[activeFilter] === option ? 'radio-button-checked' : 'radio-button-unchecked'}
                    size={24}
                    color={selectedFilters[activeFilter] === option ? colors.secondary : '#000'}
                  />
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
              <Text style={styles.clearButtonText}>Clear Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily : fonts.semibold,
    marginBottom: 20,
    
  },
  filterContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  filterList: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  filterItem: {
    padding: 15,
  },
  activeFilterItem: {
    backgroundColor: '#F0F0F0',
  },
  filterItemText: {
    fontSize: 14,
    fontFamily : fonts.regular,
  },
  activeFilterItemText: {
    fontFamily : fonts.semibold,
    color: colors.primary,
  },
  optionsContainer: {
    flex: 2,
    paddingLeft: 20,
  },
  optionsTitle: {
    fontSize: 18,
    fontFamily : fonts.semibold,
    marginBottom: 15,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    fontSize: 14,   
    marginLeft: 10,
    fontFamily : fonts.regular,
    textTransform: 'capitalize',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    marginRight: 10,
  },
  clearButtonText: {
    color: colors.primary,
    textAlign: 'center',
    fontFamily : fonts.semibold,
  },
  applyButton: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginLeft: 10,
  },
  applyButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily : fonts.semibold,
  },
});

export default FilterModal;