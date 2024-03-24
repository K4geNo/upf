package br.upf.userdept.repository;

import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public abstract class DepartmentRepositoryImpl implements DepartmentRepository {
    @PersistenceContext
    private EntityManager em;
}
