package com.devsuperior.dsvendas.services;

import java.util.List;

import com.devsuperior.dsvendas.dto.SaleDTO;
import com.devsuperior.dsvendas.dto.SaleSuccessDTO;
import com.devsuperior.dsvendas.dto.SaleSumDTO;
import com.devsuperior.dsvendas.entities.Sale;
import com.devsuperior.dsvendas.repositories.SaleRepository;
import com.devsuperior.dsvendas.repositories.SellerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SaleService {
    
    @Autowired
    private SaleRepository repository;

    @Autowired
    private SellerRepository sellerRepository;

    /*
     * Transactional = Garante que toda a operaçẽo do banco seja resolvida no momento da execução 
    */ 
    @Transactional(readOnly = true)
    public Page<SaleDTO> findAll(Pageable pageable){

        /*
         * Trazer todos os vendedores para a memória
         * Não busca os vendedores em cada resultado de uma venda
         * Funciona bem apenas se a quantidade de vendedores for pequena
         */
        sellerRepository.findAll();

        Page<Sale> result = repository.findAll(pageable);
        return result.map(x -> new SaleDTO(x));
    }

    @Transactional(readOnly = true)
    public List<SaleSumDTO> amountGroupedBySeller(){
        return repository.amountGroupedBySeller();
    }

    @Transactional(readOnly = true)
    public List<SaleSuccessDTO> successGroupedBySeller(){
        return repository.successGroupedBySeller();
    }
}
